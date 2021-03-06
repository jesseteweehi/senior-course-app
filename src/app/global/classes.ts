export interface Course {
    id?: string;
    date_created?: string;
    date_updated?: string;
    subject_name: string;
    year_level: string;
    subject_code: string;
    teacher_in_charge: string;
    course_endorsable: string;
    course_information: string;
    faculty: string;
  }

export interface Standard {
    id?: string;
    date_created: string;
    date_updated: string;
    standardtype: string;
    standardno: string;
    version: string;
    assessmenttype: string;
    further_assessment: string;
    level: string;
    credits: string;
    title: string;
    literacy_numeracy: string;
    assessment_method: string;
    completion: string;
}

export interface MyStandard {
    result: string;
    id: string;
    date_created: string;
    date_updated: string;
    standardtype: string;
    standardno: string;
    version: string;
    assessmenttype: string;
    further_assessment: string;
    level: string;
    credits: string;
    title: string;
    literacy_numeracy: string;
    assessment_method: string;
    completion: string;
}

export interface Link {
    date_created: string;
    date_updated: string;
    title: string;
    description: string;
    link: string;
}

export interface Roles {
    student?: boolean;
    teacher?: boolean;
    admin?: boolean;
 }

export interface User {
    uid: string;
    email: string;
    custom_claims: Roles;
}

export interface  StandardResult {
    identifier: string;
    courseid: string;
    result: string;
}
