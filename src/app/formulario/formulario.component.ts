import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
})
export class FormularioComponent {
  formulario: FormGroup;
  mostrarAlerta: boolean = false;

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-ZáÁéÉíÍóÓúÚâÂêÊôÔãÃõÕçÇ\s]+$/)]],
      sobrenome: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-ZáÁéÉíÍóÓúÚâÂêÊôÔãÃõÕçÇ\s]+$/)]],
      idade: [{ value: null, disabled: true }, Validators.required],
      sexo: ['N', Validators.required],
      dataNascimento: ['', Validators.required],
    });

    // Atualizar a idade automaticamente quando a data de nascimento for alterada
    this.formulario.get('dataNascimento')!.valueChanges.subscribe(() => {
      this.atualizarIdade();
    });
  }

  salvarDados() {
    if (this.formulario.valid) {
      const dados = this.formulario.value;
      dados.dataNascimento = new Date(dados.dataNascimento).toLocaleDateString('pt-BR', {timeZone: 'UTC'})
      console.log('Dados salvos:', dados);

      // Limpar os campos
      this.formulario.reset();
      this.formulario.get('sexo')!.setValue('N');
      this.formulario.get('idade')!.setValue(null);
    } else {
      this.mostrarAlerta = true;
      setTimeout(() => {
        this.mostrarAlerta = false;
      }, 5000);
    }
  }

  private atualizarIdade() {
    const dataNascimento = new Date(this.formulario.get('dataNascimento')!.value);
    const hoje = new Date();
    const idade = Math.floor((hoje.getTime() - dataNascimento.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
    this.formulario.get('idade')!.setValue(idade);
  }
}
