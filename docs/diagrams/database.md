# Database Entity Relationship Diagram (ERD)

```mermaid
erDiagram
    USERS ||--o{ TRANSACTIONS : "creates"
    USERS ||--o{ ASSISTANT_LOGS : "generates"
    
    USERS {
        uuid id PK
        string username
        string hashed_password
        boolean is_active
        datetime created_at
    }
    
    TRANSACTIONS {
        uuid id PK
        uuid user_id FK
        float monto
        string tipo
        string estado "Pending, Processing, Completed, Failed"
        string idempotency_key
        datetime created_at
        datetime processed_at
    }
    
    ASSISTANT_LOGS {
        uuid id PK
        uuid user_id FK
        text input_text
        text output_text
        datetime created_at
    }
```
