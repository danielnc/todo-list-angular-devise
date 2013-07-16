class Api::TodosController < Api::BaseController
  def index
    respond_with :api, Todo.where(user_id: current_user.id).all(order: 'completed, due_date, priority')
  end

  def show
    respond_with :api, Todo.where(user_id: current_user.id).find(params[:id])
  end

  def update
    respond_with :api, Todo.where(user_id: current_user.id).update(params[:id], todo_params)
  end

  def create
    respond_with :api, Todo.create(todo_params)
  end

  def destroy
    respond_with :api, Todo.where(user_id: current_user.id).destroy(params[:id])
  end

  private
  def todo_params
    params.require(:todo).permit(:name, :description, :completed, :priority, :due_date).merge(user_id: current_user.id)
  end
end