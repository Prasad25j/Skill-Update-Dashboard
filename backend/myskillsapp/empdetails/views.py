from django.shortcuts import render
from empdetails.models import EmpDetails,Skill,Careertrack
from empdetails.serializers import EmpDetailsSerializer
from empdetails.serializers import  SkillSerializer,CareerTrackSerializer
from django.http.response import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework import status
from django.contrib.auth.hashers import check_password

#Employee Details view
@api_view(['GET','POST'])
def empdetails_list(request):
    if request.method=='GET':
        empdetails=EmpDetails.objects.all()
        empdetails_serializer=EmpDetailsSerializer(empdetails,many=True)
        return JsonResponse(empdetails_serializer.data,safe=False)

    elif request.method=='POST':
        empdetails_data=JSONParser().parse(request)
        empdetails_serializer=EmpDetailsSerializer(data=empdetails_data)

        if empdetails_serializer.is_valid():
            empdetails_serializer.save()
            return JsonResponse(empdetails_serializer.data,status=status.HTTP_201_CREATED)
        return JsonResponse(empdetails_serializer.errors,status=status.HTTP_400_BAD_REQUEST)

#to fetch the id field using Emp_Id:
@api_view(['GET'])
def empdetails_get(request, Emp_id):
    try:
        user = EmpDetails.objects.get(Emp_id=Emp_id)
        return JsonResponse({'id':user.id})
    except EmpDetails.DoesNotExist:
        return JsonResponse({'message': 'User not found'}, status=404)

   
@api_view(['GET','PUT','DELETE'])
def empdetails_detail(request,id):
    #find record by id
    try:
        empdetails=EmpDetails.objects.get(id=id)
    except EmpDetails.DoesNotExist:
        return JsonResponse({'message':'Employee does not exist'},status=status.HTTP_404_NOT_FOUND)

    #fetch record (emp) by id
    if request.method=='GET':
        empdetails_serializer=EmpDetailsSerializer(empdetails)
        return JsonResponse(empdetails_serializer.data)

    #update emp by id
    elif request.method=='PUT':
        empdetails_data = JSONParser().parse(request)
        empdetails_serializer=EmpDetailsSerializer(empdetails,data=empdetails_data)
        if empdetails_serializer.is_valid():
            empdetails_serializer.save()
            return JsonResponse(empdetails_serializer.data)
        return JsonResponse(empdetails_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    #delete emp by id
    elif request.method =='DELETE':
        empdetails.delete()
        return JsonResponse({'message':'Employee deleted Successfully'},status=status.HTTP_204_NO_CONTENT)

#Employee Skills View
@api_view(['GET', 'POST'])
def skill_list(request):
    
    if request.method == 'GET':
        skills = Skill.objects.all()
        serializer = SkillSerializer(skills, many=True)
        return JsonResponse(serializer.data,safe=False)


    elif request.method == 'POST':
        skills_data=JSONParser().parse(request)
        serializer = SkillSerializer(data=skills_data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def skill_getall_skills(request,employee):
    try:
        skill_filter=Skill.objects.filter(employee=employee)
        if request.method == 'GET':
            serializer = SkillSerializer(skill_filter,many=True)
            return JsonResponse(serializer.data,safe=False)
    except Skill.DoesNotExist:
        return JsonResponse(status=status.HTTP_404_NOT_FOUND)
    
@api_view(['GET', 'PUT', 'DELETE'])
def skill_detail(request,employee,skil):
    try:
        skill_filtered=Skill.objects.get(employee=employee,skill_name=skil)
    except Skill.DoesNotExist:
        return JsonResponse(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = SkillSerializer(skill_filtered)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        skill_data=JSONParser().parse(request)
        serializer = SkillSerializer(skill_filtered,data=skill_data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        skill_filtered.delete()
        return JsonResponse({'message':'Skill Deleted'},status=status.HTTP_204_NO_CONTENT)
    

#Careerpath view
@api_view(['GET', 'POST'])
def careertrack_list(request):
    if request.method == 'GET':
        Carrier = Careertrack.objects.all()
        serializer = CareerTrackSerializer(Carrier, many=True)
        return JsonResponse(serializer.data,safe=False)

    elif request.method == 'POST':
        Career_data=JSONParser().parse(request)
        serializer = CareerTrackSerializer(data=Career_data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#To fetch details using selected Careerpath
@api_view(['GET', 'PUT', 'DELETE'])
def Careertrack_detail(request,tra):
    try:
        Careertrack_1 = Careertrack.objects.get(Track=tra)
    except Careertrack.DoesNotExist:
        return JsonResponse(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = CareerTrackSerializer(Careertrack_1)
        return JsonResponse(serializer.data)
        
    elif request.method == 'PUT':
        Careertrack_data=JSONParser().parse(request)
        serializer = CareerTrackSerializer(Careertrack_1,data=Careertrack_data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        Careertrack_1.delete()
        return JsonResponse({'message':'Careertrack Deleted'},status=status.HTTP_204_NO_CONTENT)


#For Validation of User:
@api_view(['POST'])
def user_validate(request):
    if request.method == 'POST':
        Emp_id = request.data.get('Emp_id')
        pwd = request.data.get('pwd')

        try:
            user = EmpDetails.objects.get(Emp_id=Emp_id)
            if check_password(pwd, user.pwd):
                return JsonResponse({'message': 'Valid User', 'Emp_id': user.Emp_id}, status=status.HTTP_201_CREATED)
            else:
                return JsonResponse({'message': 'Invalid Password'}, status=status.HTTP_401_UNAUTHORIZED)
        except EmpDetails.DoesNotExist:
            return JsonResponse({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
