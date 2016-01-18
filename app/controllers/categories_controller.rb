class CategoriesController < ApplicationController
  before_action :set_category, only: [:edit, :update, :destroy]

  def index
    @categories = Category.all
    @category = Category.new
  end

  def create
    @category = WrongWord.new(category_params)
    if @category.save
      render json: { category: @category, status: 200 }
    else
      render json: { errors: @category.errors.full_messages, status: 422 }
    end
  end

  def edit
  end

  def update
    if @category.update(category_params)
      render json: { category: @category, status: 200 }
    else
      render json: { errors: @category.errors.full_messages, status: 422 }
    end
  end

  def destroy
    render json: @category if @category.destroy
  end

  private

  def set_category
    @category = Category.find(params[:id])
  end

  def category_params
    params.require(:category).permit(:title, :icon_name)
  end
end
