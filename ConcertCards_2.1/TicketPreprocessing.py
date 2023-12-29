## imports 
import pandas as pd
from datetime import datetime

## Get raw data
df = pd.read_csv('data/RawConcertTicketData.csv')

## Create datetime column
df['FormattedDate'] = pd.to_datetime(df['Date']).dt.strftime('%B %d')

## Convert 'Section' column to type string
df['Section'] = df['Section'].apply(lambda x: str(x) if pd.notnull(x) else None)


## Create placeholder values
df['Left'] = ''
df['Right'] = ''

df['SecLabel'] = ''
df['RowLabel'] = ''
df['SeatLabel'] = ''

df['ImageName'] = ''


## Format data
for i in range(len(df)):
    
    # Create image names for ticket backgrounds
    headliner = df.loc[i,'Headliner'].replace(" ", "").replace(":", "")

    if df.loc[i,'Type'] == 'Festival':
        image = headliner + '_' + df.loc[i,'Date'][:4]

    elif df.loc[i,'Type'] == 'Show':
        image = headliner

    elif df.loc[i,'Type'] == 'Headliner':
        if df.loc[i,'Headliner'] == 'Halsey':
            show = df.loc[i,'Show'].split(":")[0].strip()
            image = headliner + '_' + show.replace(" ", "")
        else:
            image = headliner + '_' + df.loc[i,'Show'].replace(" ", "").replace(":", "")

    df.loc[i,'ImageName'] = image.replace("'", "") + '.jpeg'

    # Create location and datetime variables
    df.loc[i,'Loc'] = df.loc[i,'Venue'] + ' | ' + df.loc[i,'City']
    df.loc[i,'DateTime'] = df.loc[i,'FormattedDate'] + ' | ' + df.loc[i,'Time']

    # Format seating variables  
    if df.loc[i,'SeatType'] == 'seats':
        df.loc[i,'SecLabel'] = 'SECTION'
        df.loc[i,'RowLabel'] = 'ROW'
        df.loc[i,'SeatLabel'] = 'SEAT'
        df.loc[i,'Seat'] = df.loc[i,'Seats'].split("-")[0].strip()
        df.loc[i,'Section'] = df.loc[i,'Section'].split(".")[0].strip()

    elif df.loc[i,'SeatType'] == 'GA':
        df.loc[i,'Row'] = 'GENERAL ADMISSION'

    elif df.loc[i,'SeatType'] == 'GA Lawn':
        df.loc[i,'Row'] = 'GENERAL ADMISSION: LAWN'

## Order by date and select columns
sorted_df = df.sort_values(by=['Date'], ascending = False)
sorted_df = sorted_df[['ImageName', 'Headliner', 'Show', 'Opener', 'Loc', 'Right', 'DateTime',
                'Left', 'SecLabel', 'RowLabel', 'SeatLabel', 'Section', 'Row', 'Seat']]


## Save processed data 
sorted_df.to_csv('data/ProcessedTicketData.csv', sep = '/', index = False)