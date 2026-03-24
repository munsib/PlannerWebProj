The entities in this system are User, Semester, Course, CourseMeeting, PlannerItem, StudySession, and Syllabus.


A User may have many Semesters. 
A Semester must belong to one User.
A Semester may include many Courses. 
A Course must belong to one Semester.
A User may create many PlannerItems. 
A PlannerItem must belong to one User. 
A Course may have many PlannerItems. 
A PlannerItem must belong to one Course.

ERD Diagram for all classes:
![ERD Diagram](/images/ERDDiagram.png)

Relations Diagram for All classes
![ERD Diagram](/images/RelationsDiagram.png)
