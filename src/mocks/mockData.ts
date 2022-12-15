export const mazda3 = {
  make: "Mazda",
  model: "Mazda3",
  package: "touring",
  color: "blue",
  year: 2020,
  category: "sedan",
  mileage: 13000,
  price: 25000,
  date: new Date().toString(),
};

export const tacoma = {
  make: "Toyota",
  model: "Tacoma",
  package: "TRD Off-road",
  color: "gray",
  year: 2019,
  category: "trucks",
  mileage: 81000,
  price: 45000,
  date: new Date().toString(),
};

export const hyundai = {
  make: "Hyundai",
  model: "Tuscon",
  package: null,
  color: "black",
  year: 2021,
  category: "suv",
  mileage: 35000,
  price: 37000,
  date: new Date().toString()
};

export const allCarData = {
  'mazda3': mazda3,
  'tacoma': tacoma,
  'hyundai': hyundai
}