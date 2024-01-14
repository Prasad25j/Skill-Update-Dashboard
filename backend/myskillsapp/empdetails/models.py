from django.db import models
from django.contrib.auth.hashers import check_password, make_password

# Model for Employee Details
class EmpDetails(models.Model):
    
    Emp_id = models.CharField(max_length=40, blank=True, unique=True)
    Emp_name = models.CharField(max_length=40, blank=True, null=True)
    email = models.CharField(max_length=40, blank=True, null=True)
    pwd = models.CharField(max_length=16000, blank=True, null=True)
    Emp_designation = models.CharField(max_length=40, blank=True, null=True)
    Emp_department = models.CharField(max_length=40, blank=True, null=True)
    Emp_phone = models.CharField(max_length=40, blank=True, null=True)
    Emp_location = models.CharField(max_length=40, blank=True, null=True)
    Emp_doj = models.DateField(blank=True, null=True)
    Emp_manager = models.CharField(max_length=40, blank=True, null=True)
    Emp_project = models.CharField(max_length=40, blank=True, null=True)


#For password Encryption
    def save(self, *args, **kwargs):
        if self.pwd:
            # Encrypt the password before saving
            self.pwd = make_password(self.pwd)
        super(EmpDetails, self).save(*args, **kwargs)
        
#checking the password at the time of validation
    @staticmethod
    def authenticate_user(emp_id, password):
        try:
            user = EmpDetails.objects.get(Emp_id=emp_id)
            if check_password(password, user.pwd):
                return user
            else:
                return None
        except EmpDetails.DoesNotExist:
            return None

# Model for Skills Details of the Employee
class Skill(models.Model):
    SKILL_LEVEL_CHOICES = [
        (1, '1'),
        (2, '2'),
        (3, '3'),
        (4, '4'),
        (5, '5'),
    ]
    #employee here is foreign key from EmpDetails taking id
    employee = models.ForeignKey(EmpDetails,on_delete=models.CASCADE,)
    skill_name = models.CharField(max_length=255)
    proficiency_level = models.CharField(max_length=20, choices=SKILL_LEVEL_CHOICES)

# Model for CareerPath Details
class Careertrack(models.Model):
    Track = models.CharField(max_length=40, default="", blank=False, primary_key=True)
    Skills = models.JSONField()