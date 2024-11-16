import subprocess

services = [
    {"name": "Users", "path": "./microservices/users/server.js", "port": 3001},
    {"name": "Products", "path": "./microservices/products/server.js", "port": 3002},
    {"name": "Orders", "path": "./microservices/orders/server.js", "port": 3003},
    {"name": "API Gateway", "path": "./api-gateway/server.js", "port": 3000},
]

processes = []

def run_service(service):
    print(f"Starting {service['name']} on port {service['port']}...")
    process = subprocess.Popen(
        ["node", service["path"]],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True
    )
    processes.append((service["name"], process))

def monitor_processes():
    for name, process in processes:
        try:
            stdout, stderr = process.communicate(timeout=1)
            if stdout:
                print(f"[{name} Output]:\n{stdout}")
            if stderr:
                print(f"[{name} Error]:\n{stderr}")
        except subprocess.TimeoutExpired:
            pass

try:
    for service in services:
        run_service(service)

    print("All services started. Press Ctrl+C to stop.")
    while True:
        monitor_processes()
except KeyboardInterrupt:
    print("\nStopping all services...")
    for name, process in processes:
        process.terminate()
        print(f"{name} terminated.")
    print("All services stopped.")
