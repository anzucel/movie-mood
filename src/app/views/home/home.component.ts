import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from '../../services/data.services';
interface Genders {
  name: string,
  code: string
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MessageService]
})
export class HomeComponent implements OnInit {

  parsedData: any;
  inputValue: string = '';
  selectedGenders!: Genders[];
  genders!: Genders[];

  profileForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    movieGenres: new FormControl<Genders[]>([], Validators.required)
  })

  constructor(private router: Router,
    private messageService: MessageService, private http: HttpClient, private formBuilder: FormBuilder,private dataService: DataService) {
    this.genders = [
      { name: 'Action', code: 'Action' },
      { name: 'Adventure', code: 'Adventure' },
      { name: 'Animation', code: 'Animation' },
      { name: 'Comedy', code: 'Comedy' },
      { name: 'Crime', code: 'Crime' },
      { name: 'Drama', code: 'Drama' },
      { name: 'Family', code: 'Family' },
      { name: 'Fantasy', code: 'Fantasy' },
      { name: 'History', code: 'History' },
      { name: 'Horror', code: 'Horror' },
      { name: 'Music', code: 'Music' },
      { name: 'Mistery', code: 'Mistery' },
      { name: 'Romance', code: 'Romance' },
      { name: 'Science Fiction', code: 'Science-Fiction' },
      { name: 'Thriller', code: 'Thriller' },
      { name: 'TV Movie', code: 'TV-Movie' },
      { name: 'War', code: 'War' },
      { name: 'Western', code: 'Western' },
    ]
  }

  ngOnInit(): void {
  }
  enviarDatos() {
    // Obtiene los datos del formulario
    const formData = this.profileForm.value;
    const fullName = formData.name;
    let firstName = ''
    let lastName = ''
    let id: string;
    // Now nameParts[0] contains the first name and nameParts[1] contains the last name
    if (fullName !== null && fullName !== undefined) {
      const nameParts = fullName.split(' ');
      firstName = nameParts[0];
      lastName = nameParts[1];
    }
    let username
    const email = formData.email;
    const atIndex = email?.indexOf('@'); // Find the index of the '@' symbol
    if (atIndex !== -1) {
      username = email?.substring(0, atIndex); // Extract the substring before '@'
      console.log(username); // Output: example
    } else {
      console.log('Invalid email format'); // Handle the case where there's no '@' symbol
    }
    // Puedes acceder a los datos individualmente
    const person = {
      first_name: firstName,
      last_name: lastName,
      username: username,
      email: email
    };

    const jsonData = JSON.stringify(person);
    console.log(formData.movieGenres)
    let userList: any[];
    this.http.get<any[]>('http://localhost:5000/api/users').subscribe(
      (users) => {
        userList = users;
        const foundUser = userList.find((user) => user.email === email);
        if (foundUser) {
          // El usuario con el correo electrónico existe en el arreglo
          this.messageService.add({ severity: 'warn', summary: 'User', detail: 'User already exists' });
        } else {
          // El usuario con el correo electrónico no existe en el arreglo
          this.http.post('http://localhost:5000/api/users', person).subscribe((respuesta) => {
            if (email !== null && email !== undefined) {
              this.http.get<object>('http://localhost:5000/api/users/email/' + email).subscribe(
                (users) => {
                  let str = JSON.stringify(users)
                  const parsedObject = JSON.parse(str);
                  id = parsedObject._id;
                  let original = formData.movieGenres
                  let transformado 
                  if (original !== null && original !== undefined){
                    const categories = original.map(item => item.name);
                    transformado = { categories };
                  }
                  this.dataService.sharedData = id;
                  this.http.post('http://localhost:5000/api/users/' + id + '/movies-categories', transformado).subscribe((respuesta) => {
                    this.nextForm()
                  });
                }, (error) => {
                  console.error('Error al obtener los registros:', error);
                  return "null"
                }
              )
            }

          });
        }

      },
      (error) => {
        console.error('Error al obtener los registros:', error);

      }
    )




  }

  getId(email: string) {
    let iddd: string = ''
    this.http.get<object>('http://localhost:5000/api/users/email/' + email).subscribe(
      (users) => {
        let str = JSON.stringify(users)
        const parsedObject = JSON.parse(str);
        iddd = parsedObject._id;
      },
      (error) => {
        console.error('Error al obtener los registros:', error);
        return "null"
      }
    )
    return iddd
  }

  nextForm() {
    if (this.profileForm.valid) {
      this.router.navigate(['/scan']);
    }
    else {
      this.messageService.add({ severity: 'warn', summary: 'Incomplete Fields', detail: 'All fields must be completed' });
    }
  }


  realizarAccion(): void {
    console.log('Se ha presionado el botón.');
    // Puedes realizar otras acciones aquí
  }
}
