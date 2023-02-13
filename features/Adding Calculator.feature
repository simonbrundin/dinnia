Feature: Receptvy
  Sammanfattning av ett recept med möjlighet att redigera

  Scenario: Recept syns
    Given det finns ett recept
    When tittar på det
    Then ser jag information om receptet
    