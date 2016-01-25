class WrongWordsController < ApplicationController
  before_action :authenticate_admin!
  before_action :set_wrong_word, only: [:update, :destroy]

  def index
    @wrong_words = WrongWord.order('word ASC').group_by { |u| u.word[0] }
    @wrong_word = WrongWord.new
  end

  def create
    @wrong_word = WrongWord.new(wrong_word_params)
    if @wrong_word.save
      render json: { wrong_word: @wrong_word, status: 200 }
    else
      render json: { errors: @wrong_word.errors.full_messages, status: 422 }
    end
  end

  def destroy
    render json: @wrong_word if @wrong_word.destroy
  end

  private

  def set_wrong_word
    @wrong_word = WrongWord.find(params[:id])
  end

  def wrong_word_params
    params.require(:wrong_word).permit(:word)
  end
end
