class CheckForWrongWordsJob < ActiveJob::Base
  queue_as :default

  def perform(report)
    WrongWord.all.each do |wrong_word|
      if report.description.include? wrong_word.word
        report.update(has_wrong_word: true)
        break
      end
    end
  end
end
