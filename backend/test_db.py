from app.database.connection import engine

try:
    with engine.connect() as conn:
        print("Database connected successfully!")
except Exception as e:
    print("Database connection failed!")
    print(e)