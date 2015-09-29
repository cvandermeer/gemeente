require 'test_helper'

class ReportTest < ActiveSupport::TestCase
  setup :initialize_report

  def teardown
    @report = nil
  end

  test 'should not create report without any input' do
    report = Report.new
    assert_not report.save, 'Saved an report without any input!'
  end

  test 'should not create report without title' do
    report = Report.new(description: @report.description,
                        address: @report.address,
                        town: @report.town)
    assert_not report.save, 'Saved an report without title!'
  end

  test 'should not create report without description' do
    report = Report.new(title: @report.title,
                        address: @report.address,
                        town: @report.town)
    assert_not report.save, 'Saved an report without description!'
  end

  test 'should not create report without address' do
    report = Report.new(title: @report.title,
                        description: @report.description,
                        town: @report.town)
    assert_not report.save, 'Saved an report without address!'
  end

  test 'should not create report without town' do
    report = Report.new(title: @report.title,
                        description: @report.description,
                        address: @report.address)
    assert_not report.save, 'Saved an report without town!'
  end

  private

  def initialize_report
    @report = reports(:report1)
  end
end
