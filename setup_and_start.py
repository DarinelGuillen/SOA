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
    print("\nChecking and installing npm dependencies...")
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

if __name__ == "__main__":
    # Define root directories to search for npm projects
    npm_project_dirs = [
        "api-gateway",
        "microservices"
    ]

    # Install npm dependencies
    install_npm_dependencies(npm_project_dirs)
