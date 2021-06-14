from django.urls import path
from django.views.decorators.csrf import csrf_exempt

from api import views

urlpatterns = [
    path('high_score/', csrf_exempt(views.HighScoreView.as_view())),
]
