<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> remotes/origin/Update-UX/UI












<<<<<<< HEAD
=======
>>>>>>> fix-final
>>>>>>> remotes/origin/Update-UX/UI
package com.example.project_management_class.domain.repository;

import com.example.project_management_class.domain.model.SchoolClass;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

<<<<<<< HEAD
=======
<<<<<<< HEAD
@Repository
public interface SchoolClassRepository extends MongoRepository<SchoolClass, String> {
}
=======
>>>>>>> remotes/origin/Update-UX/UI
import java.util.List;
import java.util.Optional;

@Repository
public interface SchoolClassRepository extends MongoRepository<SchoolClass, String> {
}






    Optional<SchoolClass> findByGradeLevelAndClassName(Integer gradeLevel, String className);
    Optional<SchoolClass> findByGradeLevelAndClassNameIgnoreCase(Integer gradeLevel, String className);

    Optional<SchoolClass> findByAcademicYearIdAndGradeLevelAndClassNameIgnoreCase(String academicYearId, Integer gradeLevel, String className);

    // Backward-compat / tolerant lookup for datasets that store either "A1" or a full label like "10A1" in className.
    List<SchoolClass> findByClassNameIgnoreCase(String className);
<<<<<<< HEAD
}
=======
}
>>>>>>> fix-final
>>>>>>> remotes/origin/Update-UX/UI
