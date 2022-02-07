from http.client import HTTPResponse
from django.shortcuts import render
from django.shortcuts import HttpResponse


def dashboard(request):
    return HttpResponse("<h1>yo broda</h1>")
