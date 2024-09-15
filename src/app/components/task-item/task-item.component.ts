import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tarefa } from '../../../Tarefa';
import { faPen, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, FormsModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css'
})
export class TaskItemComponent {
  isEditing: boolean = false;

  @Input() tarefa!: Tarefa;

  @Output() onDeleteTask = new EventEmitter<Tarefa>()
  @Output() onToggleConcluido = new EventEmitter<Tarefa>()
  @Output() onEditTask = new EventEmitter<Tarefa>()

  faTimes = faTimes
  faPen = faPen
  faCheck = faCheck

  constructor(private taskService: TaskService) {}

  onDelete(tarefa: Tarefa) {
    this.onDeleteTask.emit(tarefa)
  }

  onEdit(): void {
    this.isEditing = true
  }

  onSaveEdit(tarefa: Tarefa) {
    this.isEditing = false
    this.taskService.updateTask(tarefa).subscribe(() => {
      alert('Tarefa atualizada com sucesso!');
    })
  }

  onToggle(tarefa: Tarefa) {
    this.onToggleConcluido.emit(tarefa)
  }
}
