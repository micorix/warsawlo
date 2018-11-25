import SchoolData from '../../data/data.json'

export const selectSchool = (schoolID) => ({
  type: 'SELECT_SCHOOL',
  school: SchoolData[schoolID]
})
export const unselectSchool = () => ({
  type: 'SELECT_SCHOOL',
  school: null
})
