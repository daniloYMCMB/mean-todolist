import { Component, OnInit } from '@angular/core';

import { TaskService } from '../../services/task.service';
import { Task } from '../../Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
	tasks: Task[];
	title: string;

  constructor(private taskService: TaskService) {
  	this.taskService.getTasks()
  		.subscribe(tasks => {
  		  this.tasks = tasks;
  			//console.log(tasks)
  		})
  }

  ngOnInit() {
  	console.log(this.tasks)
  }

  addTask(event) {
  	event.preventDefault();
  	const newTask: Task = {
  		title: this.title,
  		isDone: false
  	};
  	this.taskService.addTask(newTask)
  		.subscribe(task => {
  			this.tasks.push(task);
  			console.log(this.tasks);
  		});
  }

  deletaTask(id){
  	const response = confirm('are you sure to delete it?')
		if(response){
			const tasks = this.tasks;
			this.taskService.deleteTask(id)
				.subscribe(data => {
					console.log(data);
					if(data.n == 1) {
						for(let i = 0; i < tasks.length; i++) {
							if(tasks[i]._id == id) {
								tasks.splice(i, 1);
							}
						}
					}
				})
		}	
  	return;
  }

  updateTask(task: Task){
  	//console.log(id)
  	const newTask = {
  		_id: task._id,
  		title: task.title,
  		isDone: !task.isDone
  	};
  	this.taskService.updateTask(newTask)
  		.subscribe(res => {
  			task.isDone = !task.isDone
  		});
  }

}
