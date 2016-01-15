module Admin
  class WrongWordsController < ApplicationController
    before_action :authenticate_admin!
    before_action :set_wrong_word, only: [:update, :destroy]

    def index
      @wrong_words = WrongWord.all
      @new_word = WrongWord.new
    end

    def create
      @wrong_word = WrongWord(wrong_word_params)
      if @wrong_word.save
        render json: @wrong_word
      else
        render json: @wrong_word.errors
      end
    end

    def update
      if @wrong_word.update(wrong_word_params)
        render json: @wrong_word
      else
        render json: @wrong_word.errors
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
end
