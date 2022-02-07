from rest_framework import routers

from users.views import MenuViewSet

router = routers.SimpleRouter()
router.register(r"menu", MenuViewSet, basename="menu")
