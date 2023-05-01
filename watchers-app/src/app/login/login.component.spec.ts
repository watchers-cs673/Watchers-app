import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { AuthService, Auth0ClientService } from '@auth0/auth0-angular';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthService, {provide: Auth0ClientService, useValue: {}}],
      declarations: [ LoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize showModalFlag to false', () => {
    expect(component.showModalFlag).toBeFalsy();
  });

  it('should initialize hasAccount to false', () => {
    expect(component.hasAccount).toBeFalsy();
  });

  it('should initialize profileForm with firstName and lastName controls', () => {
    expect(component.profileForm.contains('firstName')).toBeTruthy();
    expect(component.profileForm.contains('lastName')).toBeTruthy();
  });

  it('should initialize loginForm with firstName, userName, and password controls', () => {
    expect(component.loginForm.contains('firstName')).toBeTruthy();
    expect(component.loginForm.contains('userName')).toBeTruthy();
    expect(component.loginForm.contains('password')).toBeTruthy();
  });

  it('should show modal when showModal is called', () => {
    component.showModal();
    expect(component.showModalFlag).toBeTruthy();
  });

  it('should hide modal when hideModal is called', () => {
    component.hideModal();
    expect(component.showModalFlag).toBeFalsy();
  });

  it('should set hasAccount to true when signUp is called', () => {
    component.signUp();
    expect(component.hasAccount).toBeTruthy();
  });

  it('should log "Sign In" when signIn is called', () => {
    spyOn(console, 'log');
    component.signIn();
    expect(console.log).toHaveBeenCalledWith('Sign In');
  });

  it('should log the login form when createAccount is called', () => {
    spyOn(console, 'log');
    component.loginForm.setValue({
      firstName: 'John',
      userName: 'john123',
      password: 'password123'
    });
    component.createAccount();
    expect(console.log).toHaveBeenCalledWith(component.loginForm);
  });

  it('should log "forgot password" when forgotPassword is called', () => {
    spyOn(console, 'log');
    component.forgotPassword();
    expect(console.log).toHaveBeenCalledWith('forgot password');
  });

  it('should log "login" when login is called', () => {
    spyOn(console, 'log');
    component.login();
    expect(console.log).toHaveBeenCalledWith('login');
  });
});
