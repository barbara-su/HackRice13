import streamlit as st
import pandas as pd

st.title("tst")
# subheader, header, text, markdown, caption, latex, json, code
st.markdown("**QwQ**")

table = pd.DataFrame({"Column 1" : [1,2,3], "C2": [2,3,4]})

st.write("## H2") 
# it can do anything!

st.metric(label = "Wind Speed", value = "120ms⁻¹", delta="-1.4ms⁻¹")

