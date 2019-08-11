FROM openjdk:8
ADD build/libs/planner-0.0.1-SNAPSHOT.jar planner.jar
EXPOSE 8085
ENTRYPOINT ["java", "-jar", "planner.jar"]