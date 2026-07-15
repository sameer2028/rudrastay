import requests
import socket

domain = "rudrastays.in"
url = f"https://{domain}/robots.txt"

print(f"Resolving IP for {domain}...")
try:
    ip = socket.gethostbyname(domain)
    print(f"IP: {ip}")
except Exception as e:
    print(f"DNS Resolution failed: {e}")

print(f"\nFetching {url}...")
try:
    response = requests.get(url, timeout=10)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text[:200]}")
except Exception as e:
    print(f"HTTP Request failed: {e}")
