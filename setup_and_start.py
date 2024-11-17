import os
import subprocess
from pathlib import Path

def run_command(command, cwd=None):
    """Runs a shell command in a specific directory."""
    try:
        result = subprocess.run(command, cwd=cwd, shell=True, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        print(result.stdout.decode().strip())
    except subprocess.CalledProcessError as e:
        print(f"Error running command: {e.stderr.decode().strip()}")

def install_npm_dependencies(root_dirs):
    """Recursively installs npm dependencies in given directories."""
    print("\nInstalling npm dependencies...")
    for root_dir in root_dirs:
        for path in Path(root_dir).rglob("package.json"):
            npm_dir = path.parent
            # Skip node_modules directories entirely
            if "node_modules" in str(npm_dir):
                continue
            # Skip if node_modules already exists
            node_modules_dir = npm_dir / "node_modules"
            if node_modules_dir.exists():
                print(f"Skipping npm install in {npm_dir} (node_modules already exists)")
            else:
                print(f"Installing dependencies in: {npm_dir}")
                run_command("npm install", cwd=npm_dir)

def start_services(services):
    """Starts services as specified in the list."""
    print("\nStarting services...")
    for service_name, start_command, cwd in services:
        print(f"Starting {service_name}...")
        run_command(start_command, cwd=cwd)

if __name__ == "__main__":
    # Define root directories to search for npm projects
    npm_project_dirs = [
        "api-gateway",
        "microservices"
    ]

    # Define services to start
    services_to_start = [
        ("Python Services", "python services.py", "."),
        ("API Gateway", "npm start", "api-gateway"),
        ("Orders Microservice", "npm start", "microservices/orders"),
        ("Products Microservice", "npm start", "microservices/products"),
        ("Users Microservice", "npm start", "microservices/users")
    ]

    # Install npm dependencies
    install_npm_dependencies(npm_project_dirs)

    # Start services
    start_services(services_to_start)
