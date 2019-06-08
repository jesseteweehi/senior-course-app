export interface Course {
    id?: string;
    date_created: string;
    date_updated: string;
    title: string;
    year_level: string;
    subject_code: string;
    teacher_in_charge: string;
    course_endorsable: string;
    course_information: string;
    faculty: string;
  }

export interface Standard {
    date_created: string;
    date_updated: string;
    standardtype: string;
    standardno: string;
    version: string;
    assessmenttype: string;
    opportunities_offered: string;
    domain: string;
    subfield: string;
    level: string;
    credits: string;
    title: string;
    literacy_numeracy: string;
    assessment_method: string;
    approximate_date_due: string;
}
