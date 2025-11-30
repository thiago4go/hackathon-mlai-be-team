# Safety Lane UI

This is the React frontend for the Safety Lane application.

## Project Structure

- `src/components`: Contains all React components.
- `src/App.jsx`: Main application component assembling the page.
- `src/index.css`: Global styles and Tailwind directives.

## Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run development server:
   ```bash
   npm run dev
   ```

## Docker

The application is containerized using Docker and Nginx.

To run with the full stack, use the root `docker-compose.yml`:

```bash
docker-compose up -d --build frontend
```

The frontend will be available at `http://localhost:3000`.
