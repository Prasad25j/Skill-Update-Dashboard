from rest_framework import serializers
from empdetails.models import EmpDetails,Skill,Careertrack

class EmpDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model=EmpDetails
        fields="__all__"
            
class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ("employee","skill_name","proficiency_level")

class CareerTrackSerializer(serializers.ModelSerializer):
    class Meta:
        model =Careertrack
        fields='__all__'