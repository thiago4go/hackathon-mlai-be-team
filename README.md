# MLAI Hackathon Environment

## 🚀 Quick Start

```bash
cd /home/ubuntu/mlai-hackathon
docker compose up -d
```

## 📦 Services

| Service | Port | URL | Credentials |
|---------|------|-----|-------------|
| **n8n** | 5679 | http://158.179.180.165:5679 | Setup on first access |
| **PostgreSQL** | 5432 (internal) | - | postgres/hackathon2025 |

## 📁 Structure

```
mlai-hackathon/
├── docker-compose.yml          # Main orchestration
├── n8n/                        # n8n workflows & files
│   └── local-files/           # Shared files
├── digital-drive-license/      # Cloned repo
└── README.md                   # This file
```

## 🛠️ Commands

```bash
# Start all services
docker compose up -d

# Stop all services
docker compose down

# View logs
docker compose logs -f

# Restart n8n
docker compose restart n8n

# Access n8n container
docker exec -it mlai-n8n sh
```

## 🔧 Digital Drive License

The repo is cloned at: `/home/ubuntu/mlai-hackathon/digital-drive-license`

To containerize it, check the repo for Dockerfile or create one based on the tech stack.

## 📝 Notes

- n8n runs on port **5679** (different from main instance on 5678)
- PostgreSQL data persists in Docker volume
- All services are in isolated `mlai-network`
