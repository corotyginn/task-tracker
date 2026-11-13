from pydantic import BaseModel, ConfigDict


class TaskCreate(BaseModel):
    title: str
    category: str = "личное"


class TaskOut(BaseModel):
    id: int
    title: str
    category: str
    completed: bool

    model_config = ConfigDict(from_attributes=True)
