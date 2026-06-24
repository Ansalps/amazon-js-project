class Car{
    #brand;
    #model;
    speed=0;
    isTrunkOpen;
    constructor(carProperty){
        this.#brand=carProperty.brand;
        this.#model=carProperty.model;
    }
    openTrunk(){
        this.isTrunkOpen=true;
    }
    closeTrunk(){
        this.isTrunkOpen=false;
    }
    displayInfo(){
        console.log(`${this.#brand} ${this.#model}, Speed: ${this.speed} km/h ${this.isTrunkOpen}`)

    }
    go(){

        if (this.speed<196 && !this.openTrunk){
            this.speed+=5;
        }
    }
    break(){
        if (this.speed>4){
        this.speed-=5;
        }
    }
}

class RaceCar extends Car{
    acceleration;
    constructor(carProperty){
        super(carProperty)
        this.acceleration=carProperty.acceleration;
    }
    go(){
        this.speed += this.acceleration;

    if (this.speed > 300) {
      this.speed = 300;
    }
  }

  openTrunk() {
    console.log('Race cars do not have a trunk.');
  }

  closeTrunk() {
    console.log('Race cars do not have a trunk.');
    }
}
const raceCart=new RaceCar({
        brand: 'McLaren',
        model: 'F1',
        acceleration: '20'
    });
    
const objects=[
    {
        brand:'Toyota',
        model:'Corolla'
    },
    {
        brand:'Tesla',
        model:'Model 3'
    }
].map((car)=>{
    return new Car(car);
})

//console.log(objects);

objects.forEach((car)=>{
    car.displayInfo();
    car.break();
    car.go();
    car.break();
    car.displayInfo();
})