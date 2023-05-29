class UserData {

  constructor(jsonData) {
    this.id = jsonData.id;
    this.gender = jsonData.gender;
    this.firstname = jsonData.firstname;
    this.lastname = jsonData.lastname;
    this.birthyear = jsonData.birthyear;
    this.age = new Date().getFullYear() - jsonData.birthyear;
    this.height = jsonData.height;
    this.weightStart = jsonData.weightStart;
    this.weightGoal = jsonData.weightGoal;
    this.bmiStart = jsonData.bmiStart;
    this.bmiGoal = jsonData.bmiGoal;
    this.activityProfile = jsonData.activityProfile;
  }
}

export default UserData;
