class MessagesController < ApplicationController
  layout false, except: [:index]
  before_action :authenticate_admin!, only: [:index]

  def new
    @message = Message.new
  end

  def create
    @message = Message.new(message_params)
    render nothing: true if verify_recaptcha(model: @message,
                                             message: "Oh! It's error with reCAPTCHA!") && @message.save
  end

  def show
    @message = Message.find(params[:id])
  end

  def index
    @messages = Message.all
  end

  private

  def message_params
    params.require(:message).permit(:name, :email, :body)
  end
end
