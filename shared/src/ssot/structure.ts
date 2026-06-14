import { permission } from 'process';
import { ForeignKeyDef, TableStructure } from '../types/types';

type LocalizedText = {
  es: string;
  en: string;
};

function getCurrentLanguage(): keyof LocalizedText {
  return globalThis.localStorage?.getItem('language') === 'en' ? 'en' : 'es';
}

function localizeText(text: LocalizedText): string {
  return text[getCurrentLanguage()] ?? text.es;
}

export const structure = {
  tables: {
    parents: {
      columns: {
        username: {
          type: 'string',
          label: { es: 'Usuario de padre/madre/tutor', en: 'Parents/tutor username'},
          input: 'text',
          editable: false,
          required: true,
          readOnlyOnEdit: true,
          validator: {
            required: true, 
            nullable: false,
            minLength: 1,
            maxLength: 20,
          }
        } 
      },
      pk: 'username',
      uiName: { es: 'Padre/Madre/Tutor', en: 'Parent/Tutor' },
      title: { es: 'Padres/Madres/Tutores', en: 'Parents/Tutors' },
      addButtonLabel: { es: 'Agregar padre/madre/tutor', en: 'Add parent/tutor' },
      permissions: {
        'post':   ['admin'],
        'put':    ['admin'],
        'get':    ['admin'],
        'delete': ['admin']
      }
    },
    children: {
      columns: {
        parents_username: {
        type: 'string',
        label: { es: 'Usuario de padre/madre/tutor', en: 'Parents/tutor username'},
        input: 'text',
        editable: false,
        required: true,
        readOnlyOnEdit: true,
        validator: {
          required: true, 
          nullable: false,
          minLength: 1,
          maxLength: 20,
        },
        nullable: false,
        derivable: {originTable: 'parents', sqlGenerationStatement: 'username'},
        foreignKey: {
            table: 'parents',
            valueField: 'username',
            labelField: 'username'
        } as ForeignKeyDef
      },
        child_username: {
          type: 'string',
          label: { es: 'Usuario de hijo/hija', en: "Child's username"},
          input: 'text',
          editable: false,
          required: true,
          readOnlyOnEdit: true,
          validator: {
            required: true, 
            nullable: false,
            minLength: 1,
            maxLength: 20,
          },
          nullable: false,
        }
      },
      pk: 'child_username',
      uiName: { es: 'Hijo/Hija', en: 'Child' },
      title: { es: 'Hijos/Hijas', en: 'Children' },
      addButtonLabel: { es: 'Agregar hijo/hija', en: 'Add child' },
      referencedTables: ['parents'],
      permissions: {
        'post':   ['admin', 'parent'],
        'put':    ['admin', 'parent'],
        'get':    ['admin', 'parent'],
        'delete': ['admin', 'parent']
      }
    },
    courses: {
      columns: {
        course_name: {
          type: 'string',
          label: { es: 'Nombre del curso', en: "Course's name"},
          input: 'text',
          editable: true,
          required: true,
          readOnlyOnEdit: false,
          validator: {
            required: true, 
            nullable: false,
            minLength: 1,
            maxLength: 100,
          },
          nullable: false,   
          },
        course_status: {
          type: 'string',
          label: { es: 'Estado del curso', en: "Course's status"},
          input: 'text',
          editable: true,
          required: false,
          readOnlyOnEdit: false,
          validator: {
            required: false, 
            nullable: true,
            minLength: 0,
            maxLength: 20,
          },
          nullable: true,
          options: [
            { value: 'in-course', label: { es: 'En curso', en: 'En curso' } },
            {
              value: 'finished',
              label: { es: 'Finalizado', en: 'Finished' },
            },
            { value: 'enrollments-open', label: { es: 'Inscripción abierta', en: 'Enrollments open' } },
          ],
        }
      },
      pk: 'course_name',
      uiName: { es: 'Curso', en: 'Course' },
      title: { es: 'Cursos', en: 'Courses' },
      addButtonLabel: { es: 'Agregar curso', en: 'Add course' },
      permissions: {
        'post':   ['admin'],
        'put':    ['admin'],
        'get':    ['admin'],
        'delete': ['admin']
      }
    },
    child_enrollments : {
      columns: {
        course_name: {
          type: 'string',
          label: { es: 'Nombre del curso', en: "Course's name"},
          input: 'text',
          readonlyOnEdit: true,
          validator: {
            required: true,
            nullable: false,
            minLength: 1,
            maxLength: 20
          },
          nullable: false,
          derivable: {originTable: 'courses', sqlGenerationStatement: 'entityName.course_name'},
          foreignKey: {
            table: 'courses',
            valueField: 'course_name',
            labelField: 'course_name'
          } as ForeignKeyDef
        },
        student_username: {
          type: 'string',
          label: { es: 'Username alumno', en: "Student's username" },
          input: 'text',
          readonlyOnEdit: true,
          validator: {
            required: true,
            nullable: false,
            minLength: 1,
            maxLength: 20
          },
          nullable: false,
          derivable: {originTable: 'children', sqlGenerationStatement: 'entityName.child_username'},
          foreignKey: {
            table: 'children',
            valueField: 'child_username',
            labelField: 'child_username'
          } as ForeignKeyDef
        },
        students_parents_username: {
          type: 'string',
          input: 'text',
          label: { es: 'Username de padre/madre/tutor', en: "Parent's/tutor's username" },
          readonlyOnEdit: true,
          validator: {
            required: true,
            nullable: false,
            minLength: 1,
            maxLength: 20
          },
          nullable: false,
          derivable: {originTable: 'parents', sqlGenerationStatement: 'entityName.username'},
          foreignKey: {
            table: 'parents',
            valueField: 'username',
            labelField: 'username',
          } as ForeignKeyDef
        },
        enrollment_date: {
          type: 'string',
          label: { es: 'Fecha de Inscripción', en: 'Enrollment Date' },
          input: 'date',
          validator: {
            required: true,
            minDate: '1821-08-09',
            maxDayOffset: 0
          },
        },
        status: {
          type: 'string',
          label: { es: 'Estado', en: 'Status' },
          input: 'select',
          validator: {
            nullable: true,
            maxLength: 20,
            minLength: 1
          },
          options: [
            { value: 'enrolled', label: { es: 'Inscrito', en: 'Enrolled' } },
            {
              value: 'completed',
              label: { es: 'Completado', en: 'Completed' },
            },
            { value: 'failed', label: { es: 'Fallido', en: 'Failed' } },
          ],
        },
        grade: {
          type: 'number',
          label: { es: 'Nota', en: 'Grade' },
          input: 'number',
          validator: {
            nullable: true,
            minValue: 0,
            maxValue: 10,
          },
          nullable: true
        },
      },
      pk: ['course_name', 'student_username', 'students_parents_username', 'enrollment_date'],
      uiName: { es: 'Inscripción', en: 'Enrollment'},
      title: { es: 'Inscripciones', en: 'Enrollments'},
      addButtonLabel: { es: 'Agregar inscripción', en: 'Add enrollment'},
      referencedTables: ['courses', 'children', 'parents'],
      permissions: {
        'post':   ['admin', 'parent'],
        'put':    ['admin', 'parent'],
        'get':    ['admin', 'parent'],
        'delete': ['admin', 'parent']
    }
  },
},
  menu: {
    theme: {
      title: { es: 'Tema', en: 'Theme' },
      id: 'theme-picker',
      handler: (value: string) => {
        try {
          if (!value) throw new Error('Theme value is required');

          document.body.setAttribute('data-theme', value);
          localStorage.setItem('theme', value);
        } catch (err) {
          console.error('Error changing theme:', err);
          alert(localizeText(structure.commonText.themeChangeError));
        }
      },
      options: [
        { value: 'light', label: { es: 'Claro', en: 'Light' } },
        { value: 'dark', label: { es: 'Oscuro', en: 'Dark' } },
      ],
      initial: () => localStorage.getItem('theme') || 'light',
    },

    language: {
      title: { es: 'Idioma', en: 'Language' },
      id: 'language-picker',
      handler: (value: string) => {
        try {
          if (value !== 'es' && value !== 'en') {
            throw new Error('Invalid language value');
          }

          localStorage.setItem('language', value);

          window.dispatchEvent(
            new CustomEvent('languagechange', {
              detail: { language: value },
            })
          );
        } catch (err) {
          console.error('Error changing language:', err);
          alert(localizeText(structure.commonText.languageChangeError));
        }
      },
      options: [
        { value: 'es', label: { es: 'Español', en: 'Spanish' } },
        { value: 'en', label: { es: 'Inglés', en: 'English' } },
      ],
      initial: () => localStorage.getItem('language') || 'es',
    },
  },

  commonText: {
    actions: { es: 'Acciones', en: 'Actions' },
    add: { es: 'Agregar', en: 'Add' },
    appTitle: {
      es: 'Sistema de Gestión Académica',
      en: 'Academic Management System',
    },
    cancel: { es: 'Cancelar', en: 'Cancel' },
    delete: { es: 'Eliminar', en: 'Delete' },
    edit: { es: 'Editar', en: 'Edit' },
    update: { es: 'Actualizar', en: 'Update' },
    login: { es: 'Ingresar', en: 'Login' },
    password: { es: 'Contraseña', en: 'Password' },
    changePassword: { es: 'Cambiar contraseña', en: 'Change Password' },
    currentPassword: { es: 'Contraseña actual', en: 'Current Password' },
    newPassword: { es: 'Nueva contraseña', en: 'New Password' },
    logout: { es: 'Salir', en: 'Logout' },
    addProfessor: { es: 'Agregar Profesor', en: 'Add Professor' },
    addAdmin: { es: 'Agregar Admin', en: 'Add Admin' },
    added: { es: 'agregado', en: 'added' },

    // Auth / session messages
    sessionExpired: { es: 'La sesión expiró', en: 'Session expired' },
    passwordChangeRequired: { es: 'Hay que cambiar la contraseña', en: 'Password change required' },
    noPermission: { es: 'No tenés permiso para esa acción', en: 'You do not have permission for that action' },
    invalidCredentials: { es: 'Credenciales inválidas', en: 'Invalid credentials' },
    loginError: { es: 'Error ingresando', en: 'Login error' },
    passwordChangeFailed: { es: 'No se pudo cambiar la contraseña', en: 'Password change failed' },
    passwordChangeError: { es: 'Error cambiando contraseña', en: 'Password change error' },
    themeChangeError: { es: 'Error al cambiar el tema', en: 'Error changing theme' },
    languageChangeError: { es: 'Error al cambiar el idioma', en: 'Error changing language' },

    // Data / record messages
    errorLoadingData: { es: 'Error cargando datos', en: 'Error loading data' },
    errorSaving: { es: 'Error guardando', en: 'Error saving' },
    errorDeleting: { es: 'Error eliminando', en: 'Error deleting' },
    errorLoadingRecord: { es: 'Error cargando registro', en: 'Error loading record' },

    // User management
    onlyAdminCanCreateUsers: { es: 'Solo admin puede crear usuarios', en: 'Only admin can create users' },
    errorCreatingUser: { es: 'Error creando usuario', en: 'Error creating user' },
    noEditPermission: { es: 'No tenés permiso para editar', en: 'You do not have edit permission' },
    studentAndUserCreated: { es: 'Alumno y usuario creados', en: 'Student and user created' },
    userAdded: { es: 'Usuario agregado', en: 'User added' },

    // Form labels
    initialPassword: { es: 'Contraseña inicial', en: 'Initial Password' },
    usernameLabel: { es: 'Usuario', en: 'Username' },
    emailLabel: { es: 'Email', en: 'Email' },
    professorRole: { es: 'Profesor', en: 'Professor' },
    adminRole: { es: 'Admin', en: 'Admin' },
    addUser: { es: 'Agregar usuario', en: 'Add user' },

    // Filters / pagination
    addFilter: { es: 'Agregar Filtro', en: 'Add Filter' },
    selectColumn: { es: 'Seleccionar columna', en: 'Select column' },
    pageInfo: { es: 'Página', en: 'Page' },
    pageOf: { es: 'de', en: 'of' },
    total: { es: 'Total', en: 'Total' },
    previous: { es: 'Anterior', en: 'Previous' },
    next: { es: 'Siguiente', en: 'Next' },
    filterPlaceholder: { es: 'Filtrar...', en: 'Filter...' },

    // Delete confirmation
    deleteConfirm: {
      es: '¿Está seguro de que desea eliminar este',
      en: 'Are you sure you want to delete this',
    },
  } satisfies Record<string, LocalizedText>,
};