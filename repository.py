
from sqlalchemy import select
from dataBase import TasksOrm, new_session
from schemas import STaskAdd

class TaskRepository:
    @classmethod
    async def add_one(cls, data:STaskAdd):
        async with new_session() as session:
            task_dist = data.model_dump()
            task = TasksOrm(**task_dist)
            session.add(task)
            await session.flush()
            await session.commit()
            return task.id
        
    async def find_all_tasks(cls):
        async with new_session() as session:
             querry= select(TasksOrm)
             result = await session.execute(querry)
             task_models = result.scalars().all()
             return task_models