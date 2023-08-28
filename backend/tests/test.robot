*** Settings ***
Library           Collections
Library           RequestsLibrary
Library           JSONLibrary

*** Variables ***
${MOCK_SERVER_URL}    http://0.0.0.0:3001/mock-forecast
${EXPECTED_DATA}      {"list": [{"dt_txt": "2023-08-27 15:00:00", "main": {"temp": 300.91}, "weather": [{"description": "clear sky"}]}]}

*** Test Cases ***
VerifyMockServerResponse
    [Documentation]    Verify that the mock server returns expected data
    [Tags]    smoke

    Create Session    mock-server    ${MOCK_SERVER_URL}
    
    ${response}    GET On Session    mock-server    /
    ${response_json}    Evaluate    json.loads($response.content)
    
    ${expected_data}    Evaluate    json.loads('''${EXPECTED_DATA}''')
    
    Should Be Equal As Strings    ${response_json}    ${expected_data}
