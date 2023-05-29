
class ActivityData {

    constructor(jsonData) {
        this.id = jsonData.id;
        this.peopleId = jsonData.people_id;
        this.typeOfActivity = jsonData.typeOfActivity; // (walking, running, cycling, swimming, etc.)
        this.duration = jsonData.duration; // (in minutes)
        this.date = jsonData.date; 
        this.datePretty = new Date(jsonData.date).toLocaleDateString("fr-FR");
        this.numberOfSteps = jsonData.numberOfSteps;
        this.consumedCalories = jsonData.consumedCalories;
    }   
}

export default ActivityData;