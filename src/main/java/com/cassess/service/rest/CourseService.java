package com.cassess.service.rest;

import com.cassess.entity.rest.Course;
import com.cassess.dao.rest.CourseServiceDaoImpl;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import javax.ejb.EJB;
import java.util.List;

@Service
public class CourseService implements ICourseService {

    @EJB
    private CourseServiceDaoImpl courseServiceDao;

    public <T> Object create(Course course){

        return courseServiceDao.create(course);
    }

    public <T> Object update(Course course){

        return courseServiceDao.update(course);
    }

    public <T> Object read(String course){

        return courseServiceDao.find(course);
    }

    public <T> Object delete(String course){

        return courseServiceDao.delete(course);

    }

    public <T> List<Course> listRead(){

        return courseServiceDao.listRead();
    }

    public JSONObject listCreate(List<Course> courses){

        return courseServiceDao.listCreate(courses);
    }

    public JSONObject listUpdate(List<Course> courses){

        return courseServiceDao.listUpdate(courses);
    }
}
