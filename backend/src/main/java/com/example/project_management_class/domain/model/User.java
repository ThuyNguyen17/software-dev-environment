<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> remotes/origin/Update-UX/UI












<<<<<<< HEAD
=======
>>>>>>> fix-final
>>>>>>> remotes/origin/Update-UX/UI
package com.example.project_management_class.domain.model;

import com.example.project_management_class.domain.enums.Role;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
<<<<<<< HEAD
import org.springframework.data.mongodb.core.mapping.Field;
=======
<<<<<<< HEAD
=======
import org.springframework.data.mongodb.core.mapping.Field;
>>>>>>> fix-final
>>>>>>> remotes/origin/Update-UX/UI

@Document(collection = "users")
@Data
public class User {

    @Id
    private String id;

    private String username;
    private String password;
    private Role role;      // ADMIN | STUDENT | TEACHER
    private boolean active;
}
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> remotes/origin/Update-UX/UI



    // NodeJS seeder stores this as "isActive". Keep the Java name "active" for readability.
    @Field("isActive")
    private Boolean active;
<<<<<<< HEAD
}
=======
}
>>>>>>> fix-final
>>>>>>> remotes/origin/Update-UX/UI
