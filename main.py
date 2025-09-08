from fastapi import  FastAPI
from contextlib import asynccontextmanager
from dataBase import create_tables, delete_tables
from router import router as tasks_router

asynccontextmanager
async def lifespan(app: FastAPI):
    await delete_tables()
    await create_tables()
    yield
    print("Shutting down...")


app = FastAPI(lifespan=lifespan) 
app.include_router(tasks_router)

