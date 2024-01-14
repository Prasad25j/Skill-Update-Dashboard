from django.urls import re_path
from empdetails import views

urlpatterns=[
    re_path(r'^api/empdetails$',views.empdetails_list),  
    re_path(r'^api/empdetails/(?P<id>[\w\d]+)$', views.empdetails_detail),
    re_path(r'^api/empdetailsget/(?P<Emp_id>[\w\d]+)$', views.empdetails_get),
    re_path(r'^api/skills$',views.skill_list),
    re_path(r'^api/skills/(?P<employee>[\w\d]+)/(?P<skil>[\w\s]+)$',views.skill_detail),
    re_path(r'^api/skills/(?P<employee>[\w\d]+)$',views.skill_getall_skills),
    re_path(r'^api/Careertrack$',views.careertrack_list),
    re_path(r'^api/Careertrack/(?P<tra>[\w\s]+)$',views.Careertrack_detail),
    re_path(r'^api/validate',views.user_validate)
   
]