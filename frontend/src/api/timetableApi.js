import axios from "axios";

export const getTeacherTimetable = async (teacherId, week, academicYear, semester) => {
  const response = await axios.get(
    `/api/teacher/${teacherId}/timetable?week=${week}&year=${academicYear}&semester=${semester}`
  );
  return response.data;
};