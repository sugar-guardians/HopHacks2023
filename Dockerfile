# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY main.py /app
COPY requirements.txt /app

# Install any needed packages specified in requirements.txt
RUN pip install --trusted-host pypi.python.org -r requirements.txt

# Expose port 80 for the FastAPI application
EXPOSE 80

# Define environment variable for MongoDB URI
ENV MONGODB_URI="mongodb+srv://tirthofficials:xK0W7XtI7JLWfhJz@cluster0.dvejt5r.mongodb.net/?retryWrites=true&w=majority"

# Run FastAPI application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]