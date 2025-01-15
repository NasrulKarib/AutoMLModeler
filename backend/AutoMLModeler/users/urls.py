from django.urls import path
from .views import signupView, LoginView

urlpatterns = [
    path('signup/', signupView.as_view(), name='user-signup'),
    path('login/', LoginView.as_view(), name='user-login'),

]
