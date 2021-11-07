from sqlalchemy import create_engine, Column, Integer, String, ForeignKey
from sqlalchemy.orm import sessionmaker, relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

# 将数据表抽象成对象
# 向表中添加新的一行即是添加新的对象实例
class User(Base):
    __tablename__ = "person" # 数据表的名称
    id = Column('id', Integer, primary_key=True) # 数据表的维度1
    username = Column('username', String, unique=True) # 数据表的维度2

engine = create_engine('sqlite:///trial.db', echo=True) # 创建flask_sqlalchemy数据库
Base.metadata.create_all(bind=engine) # ?
Session = sessionmaker(bind=engine) # ? session是什么？=> 需要 look up 一下这个概念
session = Session()
# 在 session 中进行 CRUD 操作
users = session.query(User).all()
for user in users:
    print(user.id, user.username)

session.close()

# 1. 继续收看flask教程 => 转战 educative.io
# 2. 继续了解sql_alchemy中的各种概念
