document.getElementById("add-task").addEventListener("click", addTask);
        document.getElementById("task-input").addEventListener("keypress", function(event) {
            if (event.key === "Enter") addTask();
        });
        
        function addTask() {
            let taskInput = document.getElementById("task-input");
            let taskText = taskInput.value.trim();
            if (taskText === "") return;
            
            let li = document.createElement("li");
            li.textContent = taskText;
            
            let deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Xóa";
            deleteBtn.addEventListener("click", function() {
                li.remove();
            });
            
            li.addEventListener("click", function() {
                li.classList.toggle("completed");
            });
            
            li.addEventListener("dblclick", function() {
                let newText = prompt("Chỉnh sửa công việc:", li.textContent);
                if (newText !== null) li.textContent = newText;
                li.appendChild(deleteBtn);
            });
            
            li.appendChild(deleteBtn);
            document.getElementById("task-list").appendChild(li);
            taskInput.value = "";
        }
