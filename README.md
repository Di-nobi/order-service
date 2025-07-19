# Order Service

The **Order Service** handles order creation and retrieval, publishing `order.created` events to RabbitMQ.

## 🧰 Prerequisites

- Node.js 18.x  
- Docker & Docker Compose V2  
- Git

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/order-service.git
cd order-service
npm install

###.env
REDIS_HOST=redis  
REDIS_PORT=6379  
RABBITMQ_URL=amqp://guest:guest@rabbitmq:5672  
JWT_SECRET=your_secure_jwt_secret_here  
API_KEY=1234567812  
SWAGGER_API_NAME=Order Service  
SWAGGER_API_DESCRIPTION=Order processing service  
SWAGGER_API_CURRENT_VERSION=1.0  
SWAGGER_API_ROOT=api

##Run with Docker
docker compose  up --build 

# order-service/docker-compose.yml
version: '3.8'
services:
  order-service:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - '3002:3000'
    env_file:
      - .env
    depends_on:
      redis:
        condition: service_healthy
      rabbitmq:
        condition: service_healthy
    networks:
      - shared-network

  redis:
    image: redis:6
    ports:
      - '6380:6379'
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - shared-network

  rabbitmq:
    image: rabbitmq:3-management
    ports:
      - '5673:5672'
      - '15673:15672'
    environment:
      - RABBITMQ_DEFAULT_USER=guest
      - RABBITMQ_DEFAULT_PASS=guest
    healthcheck:
      test: ["CMD", "rabbitmqctl", "status"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - shared-network

networks:
  shared-network:
    name: shared-network
    external: true

###Endpoints

| Method | Endpoint       | Description      | Request Body                                  | Response Body                                                                                                                                                       |
| ------ | -------------- | ---------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| POST   | /orders/create | Create new order | `{ "product": "string", "quantity": number }` | `{ "success": true, "message": "Order created", "data": { "orderId": "string" } }`                                                                                  |
| GET    | /orders/\:id   | Get order by ID  | None                                          | `{ "success": true, "message": "Order retrieved", "data": { "id": "string", "userId": "string", "product": "string", "quantity": number, "createdAt": "string" } }` |
| GET    | /health        | Health check     | None                                          | `{ "status": "OK" }`                                                                                                                                                |

docker compose  up --build 

X-API-Key: 1234567812
Authorization: Bearer <jwt_token>

###Access Swagger at
http://localhost:3002/api or http://localhost:3005/api  (Gateway)


</details>

---


