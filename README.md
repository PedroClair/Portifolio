## Server
- python3 -m venv env // python -m venv envWin
- source env/bin/activate // .\envWin\Scripts\activate -> python.exe -m pip install --upgrade pip
- pip install django mysqlclient djangorestframework django-cors-headers djangorestframework-simplejwt
- django-admin startproject server
- ./server/server/settings.py
```bash
    DATABASES = {
      'default': {
          'ENGINE': 'django.db.backends.mysql', 
          'NAME': 'performance',
          'USER': 'root',
          'PASSWORD': 'ibd2024',    # or mysql password
          'HOST': '127.0.0.1',      # maybe localhost in MySQL
          'PORT': '3306',           # Generaly the port 3306 is the standart of MySQL
        }
    }
```
- create database performance; (python-connector or workbench or sever)
- cd server/
- python manage.py startapp users
- server/settings.py 
```bash
  INSTALLED_APPS = [
      # other apps
      'rest_framework',
      'users',  # your new app
  ]
```
- create server/users/serializers.py
```bash
  from django.contrib.auth.models import User
  from rest_framework import serializers

  class UserSerializer(serializers.ModelSerializer):
      class Meta:
          model = User
          fields = ('id', 'username', 'email', 'password')
          extra_kwargs = {'password': {'write_only': True}}

      def create (self, validated_data):
          user = User.objects.create_user(
              username=validated_data['username'],
              email=validated_data['email'],
              password=validated_data['password'],
          )
          return user
```
- server/users/views.py
```bash
from rest_framework import generics
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework import status

# Create your views here.
class RegisterUserView(generics.CreateAPIView):
    serializer_class = UserSerializer

    def post(self, resquest, *args, **kwargs):
        serializer = self.get_serializer(data=resquest.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message":"User created sucessfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
```

- server/server/urls.py
```bash
  from django.contrib import admin
  from django.urls import path
  from users.views import RegisterUserView

  urlpatterns = [
      path('admin/', admin.site.urls),
      path('api/register/', RegisterUserView.as_view(), name='register'),
  ]
```
- python manage.py migrate
- python manage.py runserver

## End Server

## Interface
- node -v
- npm -v
- npx create-react-app interface
- cd interface
- npm install axios
- interface/src/Register.js
```bash
// src/Register.js
import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register/', {
        username,
        email,
        password,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage("An error occurred while creating the user.");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Register;
```
- interface/src/App.js
```bash
import React from 'react';
import Register from './Register';

function App() {
  return (
    <div className="App">
      <h1>User Registration</h1>
      <Register />
    </div>
  );
}

export default App;
```
